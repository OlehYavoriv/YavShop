import React from "react";
import PaypalExpressBtn from "react-paypal-express-checkout";

export default class PaypalButton extends React.Component {
  render() {
    const onSuccess = (payment) => {
      console.log("The payment was succeeded!", payment);
      this.props.tranSuccess(payment);
    };

    const onCancel = (data) => {
      console.log("The payment was cancelled!", data);
    };

    const onError = (err) => {
      console.log("Error!", err);
    };

    let env = "sandbox";
    let currency = "USD";
    let total = this.props.total;

    const client = {
      sandbox:
        "YOUR-sandbox-APP-ID",
      production: "YOUR-PRODUCTION-APP-ID",
    };

    let style = {
      size: "small",
      color: "blue",
      shape: "rect",
      label: "checkout",
      tagline: false,
    };
    return (
      <PaypalExpressBtn
        env={env}
        client={client}
        currency={currency}
        total={total}
        onError={onError}
        onSuccess={onSuccess}
        onCancel={onCancel}
        style={style}
      />
    );
  }
}
