import stripe from "stripe";
const stripeWithKey = stripe(
  "sk_test_51KHITAJ71VPiEiAhAfRAtIMDwEn0jpFTd45sQRRE54te89SjiV0i733o39miXzyzmxX6hkLdTYVJk9tBSssJXstf00roIBQKBH"
);

export const post = async (token, amount) => {
  stripeWithKey.charges.create(
    {
      source: token,
      amount: amount,
      currency: "usd",
    },
    (stripeErr, stripeRes) => {
      console.log("stripeRes = " + stripeRes);
      console.log("stripeErr = " + stripeErr);

      if (stripeErr) return stripeErr;
      return stripeRes;
    }
  );
};
