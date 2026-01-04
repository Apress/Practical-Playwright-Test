import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Checkout.module.css';

const Checkout: React.FC = () => {
  const [showManualAddress, setShowManualAddress] = useState(false);
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [address1, setAddress1] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [city, setCity] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const isFormValid =
    showManualAddress &&
    email.trim() !== '' &&
    fullName.trim() !== '' &&
    address1.trim() !== '' &&
    postalCode.trim() !== '' &&
    city.trim() !== '' &&
    cardNumber.trim() !== '' &&
    expiry.trim() !== '' &&
    cvc.trim() !== '';

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (isSubmitting || !isFormValid) return;
    setIsSubmitting(true);
    setIsComplete(true);
    setIsSubmitting(false);
  };

  if (isComplete) {
    return (
      <div className={styles.page}>
        <div className={styles.navbar}>
          <Link to="/">Home</Link>
        </div>
        <div className={`${styles.checkoutCard} ${styles.center}`}>
          <div className={styles.brandCircle}>p</div>
          <h1>Thank you!</h1>
          <p data-testid="submit-button-success">
            Payment confirmed. A receipt is on the way.
          </p>
          <p>For this demo, no payment is processed.</p>
          <Link to="/">
            <button className={styles.primaryButton}>Return home</button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.navbar}>
        <Link to="/">Home</Link>
      </div>

      <div className={styles.checkoutCard}>
        <div className={styles.headerRow}>
          <div className={styles.brandCircle}>p</div>
          <div>
            <p className={styles.muted}>Powdur Essentials</p>
            <h1 className={styles.price}>$33.30</h1>
          </div>
        </div>

        <div className={styles.summaryLayout}>
          <div className={styles.summaryPane}>
            <div className={styles.summaryRow}>
              <span className={styles.summaryLabel}>Subtotal</span>
              <span>$37.00</span>
            </div>
            <div className={styles.summaryRow}>
              <span className={styles.summaryLabel}>Discount</span>
              <span>- $3.70</span>
            </div>
            <div className={styles.summaryRow}>
              <span className={styles.summaryLabel}>Tax</span>
              <span>$0.00</span>
            </div>
            <div className={styles.divider} />
            <div className={`${styles.summaryRow} ${styles.totalRow}`}>
              <span>Total due</span>
              <strong>$33.30</strong>
            </div>
          </div>

          <div className={styles.formPane}>
            <div className={styles.section}>
              <div className={styles.sectionHeader}>
                <div>
                  <p className={styles.sectionTitle}>Shipping</p>
                  <p className={styles.sectionHint}>Enter your contact and address.</p>
                </div>
              </div>

              <label className={styles.field}>
                Email
                <input
                  type="email"
                  name="email"
                  placeholder="email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </label>

              <label className={styles.field}>
                Full name
                <input
                  type="text"
                  name="fullName"
                  placeholder="Full name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
              </label>

              <button
                type="button"
                className={styles.linkButton}
                onClick={() => setShowManualAddress((prev) => !prev)}
                aria-pressed={showManualAddress}
              >
                Enter address manually
              </button>

              {showManualAddress && (
                <div className={styles.addressGrid}>
                  <label className={styles.field}>
                    Address line 1
                    <input
                      type="text"
                      name="address1"
                      placeholder="Address line 1"
                      value={address1}
                      onChange={(e) => setAddress1(e.target.value)}
                      required
                    />
                  </label>
                  <label className={styles.field}>
                    Postal code
                    <input
                      type="text"
                      name="postalCode"
                      placeholder="Postal code"
                      value={postalCode}
                      onChange={(e) => setPostalCode(e.target.value)}
                      required
                    />
                  </label>
                  <label className={styles.field}>
                    City
                    <input
                      type="text"
                      name="city"
                      placeholder="City"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      required
                    />
                  </label>
                </div>
              )}
            </div>

            <div className={styles.section}>
              <div className={styles.sectionHeader}>
                <div>
                  <p className={styles.sectionTitle}>Payment method</p>
                  <p className={styles.sectionHint}>Card info only; other methods disabled.</p>
                </div>
              </div>

              <div className={styles.cardBox}>
                <label className={styles.field}>
                  Card number
                  <input
                    type="text"
                    inputMode="numeric"
                    name="cardNumber"
                    placeholder="1234 1234 1234"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    required
                  />
                </label>
                <div className={styles.cardRow}>
                  <label className={styles.field}>
                    MM / YY
                    <input
                      type="text"
                      name="expiry"
                      placeholder="MM / YY"
                      inputMode="numeric"
                      pattern="\d{2}/?\d{2}"
                      maxLength={5}
                      value={expiry}
                      onChange={(e) => setExpiry(e.target.value)}
                      required
                    />
                  </label>
                  <label className={styles.field}>
                    CVC
                    <input
                      type="text"
                      inputMode="numeric"
                      name="cvc"
                      placeholder="CVC"
                      pattern="\d{3}"
                      maxLength={3}
                      value={cvc}
                      onChange={(e) => setCvc(e.target.value)}
                      required
                    />
                  </label>
                </div>
              </div>

              <button
                type="submit"
                className={styles.primaryButton}
                data-testid="hosted-payment-submit-button"
                disabled={isSubmitting || !isFormValid}
                onClick={handleSubmit}
              >
                {isSubmitting ? 'Processing...' : 'Pay now'}
              </button>
              <p className={styles.secureNote}>Test mode</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
