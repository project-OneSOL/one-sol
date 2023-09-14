class PaymentMemberDto {
  constructor(
    id,
    name,
    amount,
    bankName,
    cardNumber,
    cardExpirationYear,
    cardExpirationMonth,
    customerIdentityNumber
  ) {
    this.id = id;
    this.name = name;
    this.amount = amount;
    this.bankName = bankName;
    this.cardNumber = cardNumber;
    this.cardExpirationYear = cardExpirationYear;
    this.cardExpirationMonth = cardExpirationMonth;
    this.customerIdentityNumber = customerIdentityNumber;
  }
}
export default PayMember; 
