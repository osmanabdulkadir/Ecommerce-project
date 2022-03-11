import React from "react";
import { Container, Typography, Button, Grid } from "@material-ui/core";
import { Link } from "react-router-dom";
import CartItem from "./CartItem/CartItem";
import useStyles from "./styles";

const Cart = ({
  cart,
  item,
  handleUpdateCartQty,
  handleEmptyCart,
  handleRemoveFromCart
}) => {
  const classes = useStyles();

  const EmptyCart = () => {
    return (
      <Typography variant="subtitle1">
        you have no items in your cart, Start Adding some!
        <Link to="/" className={classes.cart}>
          start adding some.
        </Link>
      </Typography>
    );
  };

  const FilledCart = ({ item }) => {
    return (
      <>
        <Grid container spacing={3}>
          {cart.line_items.map(() => (
            <Grid item xs={12} sm={4} key={item}>
              <CartItem
                item={item}
                onUpdateCartQty={handleUpdateCartQty}
                onRemoveFromCart={handleRemoveFromCart}
              />
            </Grid>
          ))}
        </Grid>
        <div className={classes.cardDetails}>
          <Typography variant="h4">
            SubTotal: {cart.subtotal.formatted_with_symbol}
          </Typography>
          <div>
            <Button
              onClick={handleEmptyCart}
              className={classes.emptyButton}
              size="large"
              type="button"
              variant="contained"
              color="secondary"
            >
              Empty Cart
            </Button>
            <Button
              className={classes.checkoutButton}
              size="large"
              type="button"
              variant="contained"
              color="Primary"
            >
              Checkout
            </Button>
          </div>
        </div>
      </>
    );
  };
  if (!cart.line_items) return "Loading...";

  return (
    <Container>
      <div className={classes.toolbar} />
      <Typography className={classes.title} varinat="h3" guttterBottom>
        Your Shopping Cart
      </Typography>
      {!cart.line_items.length ? <EmptyCart /> : <FilledCart />}
    </Container>
  );
};

export default Cart;
