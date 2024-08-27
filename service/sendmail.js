import transporters from "./email.js";

export const ForgetPasswordMail = async (customer, otp) => {
    var mailOptions = {
        from: {
            name: "HRM-LITE RUPIOO",
            address: process.env.EMAIL,
        },
        to: customer.Email,
        subject: "Password Has Been Reset",
        html: `<div style={{fontFamily: "Helvetica,Arial,sans-serif",minWidth: 1000,overflow: "auto",lineHeight: 2}}<div style={{ margin: "50px auto", width: "70%", padding: "20px 0" }}><div style={{ borderBottom: "1px solid #eee" }}><a href=""style={{ fontSize: "1.4em",color: "#00466a" textDecoration: "none",fontWeight: 600}}></a></div><p style={{ fontSize: "1.1em" }}>Hi ${customer.Name}</p><p>The password for your HRM LITE RUPIOO Password has been successfully reset</p><h2 value="otp" style={{ background: "#00466a", margin: "0 auto",width: "max-content" padding: "0 10px",color: "#fff",borderRadius: 4}}>
      ${otp}
      </h2><p style={{ fontSize: "0.9em" }}Regards,<br />HRM-LITE RUPIOO</p><hr style={{ border: "none", borderTop: "1px solid #eee" }} /></div</div>`,
    };
    try {
        await transporters.sendMail(mailOptions);
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}