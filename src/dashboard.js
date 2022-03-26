import React from "react";
import styled from "styled-components";
import {
  getProducts,
  deleteProduct,
  addProduct,
  editProduct,
} from "./firebase/apiCalls";
import { ROUTE } from "./routes";
import ButtonAppBar from "./navbar";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

const DashboardStyles = styled.div`
  margin: 10px 10px;
  text-align: center;

  .price {
    color: #369650;
    font-weight: bold;
    font-size: 20px;
  }

  .add-padding {
    padding: 10px;
  }
`;

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      editMode: false,
      editValue: {},
      file: undefined,
    };
  }

  async componentDidMount() {
    const login = this.logInCheck();
    if (login) {
      const getCall = await getProducts();
      this.setState({ products: getCall });
    } else {
      this.props.history.push(ROUTE.INDEX);
    }
  }

  render() {
    const { products, editMode, editValue } = this.state;
    return (
      <>
        <ButtonAppBar onAdd={() => this.onAdd()} />
        <Paper>
          <DashboardStyles>
            <Grid container direction="row" spacing={2}>
              {products.map((x, index) => (
                  <Grid item xs={4} key={index}>
                    <Paper>
                      <Grid container spacing={2} className="add-padding">
                        <Grid item xs={12}>
                          <img
                            src={x.urlPath}
                            alt="Product Image"
                            width="200"
                            height="140"
                          />
                        </Grid>

                        <Grid item xs={12}>
                          <strong>{x.title}</strong>
                        </Grid>

                        <Grid item xs={12}>
                          <span>{x.model}</span>
                        </Grid>

                        <Grid item xs={12}>
                          <span className="price">$ {x.price}</span>
                        </Grid>

                        <Grid item xs={6}>
                          <Button
                            color="secondary"
                            variant="contained"
                            className="edit-button"
                            onClick={() => this.onEditModeClick(x)}
                          >
                            Edit
                          </Button>
                        </Grid>

                        <Grid item xs={6}>
                          <Button
                            variant="contained"
                            className="delete-button"
                            onClick={() => this.onDelete(x)}
                          >
                            Delete
                          </Button>
                        </Grid>
                      </Grid>
                    </Paper>
                  </Grid>
                ))}
            </Grid>
          </DashboardStyles>
        </Paper>
      </>
    );
  }

  logInCheck = () => {
    const data = this.props.history.location.state;
    if(data && data.iLogin){
      return data.iLogin;
    } else {
      return false;
    }
  };

  upload = (event) => {
    new Promise((resolve, reject) => {
      if (event && event !== null) {
        const file = event.target.files[0];

        if (file !== undefined) {
          const reader = new FileReader();

          reader.onloadend = async (e) => {
            if (reader.result !== null) {
              this.setState({
                ...this.state,
                editValue: {
                  ...this.state.editValue,
                  image: file.name,
                },
                file,
              });
              resolve(true);
            }
          };
          reader.readAsDataURL(file);
        } else {
          reject();
        }
      }
    });
  };

  onFieldChange = (e, name) => {
    this.setState({
      ...this.state,
      editValue: {
        ...this.state.editValue,
        [name]: e.target.value,
      },
    });
  };

  async onAdd() {
    this.props.history.push({ pathname: ROUTE.ADD, state: { iLogin: true }});
  }

  async onSave() {
    if (this.state.editValue.key === undefined) {
      await addProduct(
        this.state.editValue,
        this.state.file ? this.state.file : ""
      );
    } else {
      await editProduct(
        this.state.editValue,
        this.state.file ? this.state.file : ""
      );
    }
    this.onEditCancelClick();
    this.callproductionDb();
  }

  onEditModeClick(product) {
    this.props.history.push({ pathname: ROUTE.EDIT, state: { iLogin: true, productId: product.key }});
  }

  onEditCancelClick() {
    this.setState({ editMode: false, editValue: {}, file: undefined });
  }

  async onDelete(product) {
    await deleteProduct(product.key);
    this.callproductionDb();
  }

  async callproductionDb() {
    const getCall = await getProducts();
    this.setState({ products: getCall });
  }
}

export default Dashboard;