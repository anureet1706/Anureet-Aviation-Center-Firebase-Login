import React from "react";
import styled from "styled-components";
import {
  getProducts,
  deleteProduct,
  addProduct,
  AddProduct,
} from "./firebase/apiCalls";
import { ROUTE } from "./routes";
import ButtonAppBar from "./navbar";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

const AddStyles = styled.div`
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

class Add extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      AddMode: false,
      AddValue: {},
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
    const { products, AddMode, AddValue } = this.state;
    return (
      <>
        <ButtonAppBar />
        <Paper>
          <AddStyles>
            <Grid container direction="row" spacing={2}>
              <Grid item xs={12}>
                <label htmlFor="contained-button-file">
                  <input
                    style={{ display: "none" }}
                    accept="image/*"
                    id="contained-button-file"
                    type="file"
                    onChange={(e) => this.upload(e)}
                  />
                  <Button variant="contained" component="span">
                    Upload
                  </Button>
                </label>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  id="title"
                  label="Title"
                  variant="outlined"
                  value={AddValue.title}
                  onChange={(e) => this.onFieldChange(e, "title")}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  id="model"
                  label="Model"
                  variant="outlined"
                  value={AddValue.model}
                  onChange={(e) => this.onFieldChange(e, "model")}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  id="price"
                  label="price"
                  variant="outlined"
                  value={AddValue.price}
                  onChange={(e) => this.onFieldChange(e, "price")}
                />
              </Grid>

              <Grid item xs={6}>
                <Button
                  color="secondary"
                  variant="contained"
                  className="Add-button"
                  onClick={() => this.onSave()}
                >
                  Save
                </Button>
              </Grid>

              <Grid item xs={6}>
                <Button
                  variant="contained"
                  className="cancel-button"
                  onClick={() => this.onAddCancelClick()}
                >
                  Cancel
                </Button>
              </Grid>
            </Grid>
          </AddStyles>
        </Paper>
      </>
    );
  }

  logInCheck = () => {
    const data = this.props.history.location.state;
    if (data && data.iLogin) {
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
                AddValue: {
                  ...this.state.AddValue,
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
      AddValue: {
        ...this.state.AddValue,
        [name]: e.target.value,
      },
    });
  };

  async onSave() {
    await addProduct(
      this.state.AddValue,
      this.state.file ? this.state.file : ""
    );
    this.onAddCancelClick();
  }

  onAddModeClick(product) {
    this.setState({ AddMode: true, AddValue: product });
  }

  onAddCancelClick() {
    this.props.history.push({
      pathname: ROUTE.DASHBOARD,
      state: { iLogin: true },
    });
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

export default Add;
