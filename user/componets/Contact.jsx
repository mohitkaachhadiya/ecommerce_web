import React from 'react'

const Contact = () => {
    return (
        <>
            <div className="contact">
                <div className="contact-container">
                    <div className="contact-info">
                        <div>
                            <p>Shipping & Returns</p>
                            <p>Store Policy</p>
                            <p>Payment Methods</p>
                        </div>
                        <div>
                            <p>Contact</p>
                            <p>Tel: 123-456-7890</p>
                            <p>info@mysite.com</p>
                        </div>
                        <div>
                            <p>Facebook</p>
                            <p>Instagram</p>
                            <p>Pinterest</p>
                        </div>
                    </div>
                    <div className="newsletter">
                        <p>Join our mailing list and never miss an update</p>
                        <div>
                            <input placeholder="Enter your email" type="text" className="contact-input" />
                            <button>Subscribe Now</button>
                        </div>
                        <label style={{ display: 'block', cursor: 'pointer' }}>
                            <input type="checkbox" value="Black" /> Yes, subscribe me to your newsletter.*
                        </label>
                    </div>
                </div>
            </div>

            <div className="wix">
                <p>© 2035 by Tote. Powered and secured by Wix</p>
            </div>
        </>



    )
}

export default Contact
