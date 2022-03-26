import React from "react";
import styled from "styled-components";
import {
  getProducts,
  deleteProduct,
  addProduct,
  editProduct,
} from "./firebase/apiCalls";
import ButtonAppBar from "./navbar";
import { ROUTE } from "./routes";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

const EditStyles = styled.div`
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

class Edit extends React.Component {
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

      const data = this.props.history.location.state;
      if(data && data.productId){
       const ind = getCall.findIndex(x => x.key === data.productId);
       this.setState({ editValue: getCall[ind], products: getCall });
      }
    } else {
      this.props.history.push(ROUTE.INDEX);
    }
  }

  render() {
    const { editValue } = this.state;
    return (
      <>
      <ButtonAppBar />
        {editValue !== {} && <Paper>
          <EditStyles>
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
                      name="title"
                      label="Title"
                      variant="outlined"
                      defaultValue={editValue.title}
                      value={editValue.title}
                      onChange={(e) => this.onFieldChange(e, "title")}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      id="model"
                      label="Model"
                      variant="outlined"
                      defaultValue={editValue.model}
                      value={editValue.model}
                      onChange={(e) => this.onFieldChange(e, "model")}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      id="price"
                      label="price"
                      variant="outlined"
                      defaultValue={editValue.price}
                      value={editValue.price}
                      onChange={(e) => this.onFieldChange(e, "price")}
                    />
                  </Grid>

                  <Grid item xs={6}>
                    <Button
                      color="secondary"
                      variant="contained"
                      className="edit-button"
                      onClick={() => this.onSave()}
                    >
                      Save
                    </Button>
                  </Grid>

                  <Grid item xs={6}>
                    <Button
                      variant="contained"
                      className="cancel-button"
                      onClick={() => this.onEditCancelClick()}
                    >
                      Cancel
                    </Button>
                  </Grid>
            </Grid>
          </EditStyles>
        </Paper>}
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

  onEditCancelClick() {
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

export default Edit;