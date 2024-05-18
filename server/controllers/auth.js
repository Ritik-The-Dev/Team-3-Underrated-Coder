import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import nodeMailer from "nodemailer";
import User from "../models/auth.js";
import otpSchema from "../models/otp.js";
import otpGenerator from "otp-generator";
import dotenv from "dotenv";

dotenv.config();

export const signup = async (req, res) => {
  const { name, otp, email, password } = req.body;
  try {
    const existinguser = await User.findOne({ email });
    if (existinguser) {
      return res.status(404).json({ message: "User already Exist." });
    }

    //extract otp from database
    const Sendedotp = await otpSchema.findOne({ email });
    if (!Sendedotp || Sendedotp === "" || Sendedotp === null) {
      return res.status(403).json({
        message: "Otp is Expired",
      });
    }

    //check otp matches or not`
    if (otp !== Sendedotp.otp) {
      return res.status(403).json({
        success: false,
        message: "Invalid Otp",
      });
    }

    await otpSchema.findByIdAndDelete(Sendedotp._id);

    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    const token = jwt.sign(
      { email: newUser.email, id: newUser._id },
      process.env.JWT_SECRET,
      { expiresIn: "30d" }
    );
    res
      .status(200)
      .json({
        message: "SignUp Successfully",
        success: true,
        result: newUser,
        token,
      });
  } catch (error) {
    res.status(500).json("Something went worng...");
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existinguser = await User.findOne({ email });
    if (!existinguser) {
      return res.status(404).json({ message: "User don't Exist." });
    }
    const isPasswordCrt = await bcrypt.compare(password, existinguser.password);
    if (!isPasswordCrt) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { email: existinguser.email, id: existinguser._id },
      process.env.JWT_SECRET,
      { expiresIn: "30d" }
    );

    res
      .status(200)
      .json({
        message: "Login Successfully",
        success: true,
        result: existinguser,
        token,
      });
  } catch (error) {
    console.log(error);
    res.status(500).json("Something went worng...", error);
  }
};

export const sendForgetOtp = async (req, res) => {
  try {
    const { email } = req.body;

    //validate user exists or not
    const userExist = await User.findOne({ email: email });
    if (!userExist) {
      return res.status(404).json({
        message: "User does not exists with this email",
        success: false,
      });
    }
    const oldOtp = await otpSchema.findOne({ email });
    if (oldOtp) {
      await otpSchema.findByIdAndDelete(oldOtp._id);
    }
    //Generate otp
    const otp = otpGenerator.generate(6, {
      lowerCaseAlphabets: false,
      upperCaseAlphabets: false,
      specialChars: false,
    });

    //if userexists send otp
    const transporter = nodeMailer.createTransport({
      host: process.env.MAIL_HOST,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    try {
      await transporter.sendMail({
        from: "Team 3 Live Project",
        to: email,
        subject: "Email Authentication",
        html: `
          <html>
            <head>
              <style>
                body {
                  font-family: Arial, sans-serif;
                  line-height: 1.6;
                  color: #333;
                  margin: 0;
                  padding: 0;
                }
                .container {
                  padding: 20px;
                  background-color: #f9f9f9;
                  border: 1px solid #ddd;
                  border-radius: 5px;
                  width: 80%;
                  margin: 20px auto;
                }
                .header {
                  font-size: 24px;
                  font-weight: bold;
                  color: #4CAF50;
                  text-align: center;
                  margin-bottom: 20px;
                }
                .otp {
                  font-size: 32px;
                  font-weight: bold;
                  color: #E74C3C;
                  text-align: center;
                  margin: 20px 0;
                }
                .message {
                  font-size: 16px;
                  margin-bottom: 20px;
                }
                .footer {
                  font-size: 14px;
                  color: #555;
                  text-align: center;
                  margin-top: 20px;
                }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="header">Email Authentication</div>
                <div class="message">
                  Otp for Authentication is
                </div>
                <div class="otp">${otp}</div>
                <div class="message">
                  Do not share it with anyone.
                </div>
                <div class="message">
                  Valid for 5 minutes only.
                </div>
                <div class="footer">
                  &copy; ${new Date().getFullYear()} Team 3 Live Project
                </div>
              </div>
            </body>
          </html>
        `,
      });
    } catch (err) {
      console.log(`Failed to send Email`, err);
      return res.status(403).json({ msg: "Failed to send Otp" });
    }

    await otpSchema.create({ otp, email });

    //send response
    res.status(200).json({
      message: `OTP has been sent on your registered mail id`,
      success: true,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      data: err.message,
      message: "Internal Server Error",
    });
  }
};

export const sendSignUpOtp = async (req, res) => {
  try {
    const { email } = req.body;

    //validate user exists or not
    const userExist = await User.findOne({ email: email });
    if (userExist) {
      return res.status(404).json({
        message: "User Already exists with this email",
        success: false,
      });
    }
    const oldOtp = await otpSchema.findOne({ email });
    if (oldOtp) {
      await otpSchema.findByIdAndDelete(oldOtp._id);
    }
    //Generate otp
    const otp = otpGenerator.generate(6, {
      lowerCaseAlphabets: false,
      upperCaseAlphabets: false,
      specialChars: false,
    });

    //if userexists send otp
    const transporter = nodeMailer.createTransport({
      host: process.env.MAIL_HOST,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    try {
      await transporter.sendMail({
        from: "Team 3 Live Project <your-email@example.com>",
        to: email,
        subject: "Email Authentication",
        html: `
        <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
              color: #333;
              margin: 0;
              padding: 0;
              background-color: #f4f4f4;
            }
            .container {
              padding: 20px;
              background-color: #ffffff;
              border: 1px solid #ddd;
              border-radius: 8px;
              width: 80%;
              max-width: 600px;
              margin: 20px auto;
              box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }
            .header {
              font-size: 24px;
              font-weight: bold;
              color: #4CAF50;
              text-align: center;
              margin-bottom: 20px;
            }
            .otp {
              font-size: 36px;
              font-weight: bold;
              color: #E74C3C;
              text-align: center;
              margin: 20px 0;
            }
            .message {
              font-size: 16px;
              margin-bottom: 20px;
              text-align: center;
            }
            .footer {
              font-size: 14px;
              color: #555;
              text-align: center;
              margin-top: 20px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">Email Authentication</div>
            <div class="message">
              OTP for authentication is
            </div>
            <div class="otp">${otp}</div>
            <div class="message">
              Do not share it with anyone.
            </div>
            <div class="message">
              Valid for 5 minutes only.
            </div>
            <div class="footer">
              &copy; ${new Date().getFullYear()} Team 3 Live Project
            </div>
          </div>
        </body>
      </html>
        `,
      });
    } catch (err) {
      console.log(`Failed to send Email`, err);
      return res.status(403).json({ msg: "Failed to send Otp" });
    }

    await otpSchema.create({ otp, email });

    //send response
    return res.status(200).json({
      message: `OTP has been sent on ${email}`,
      success: true,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      data: err.message,
      message: "Internal Server Error",
    });
  }
};

export const changePassword = async (req, res) => {
  try {
    const { email, otp, newpassword } = req.body;

    //validate user exists or not
    const userExist = await User.findOne({ email: email });
    if (!userExist) {
      return res.status(404).json({
        message: "User does not exists with this email",
        success: false,
      });
    }

    //extract otp from database
    const Sendedotp = await otpSchema.findOne({ email });

    if (!Sendedotp || Sendedotp === "" || Sendedotp === null) {
      return res.status(403).json({
        message: "Otp is Expired",
      });
    }

    //extract userId too
    const userId = userExist._id;

    //check otp matches or not`
    if (otp !== Sendedotp.otp) {
      return res.status(403).json({
        success: false,
        message: "Invalid Otp",
      });
    }

    await otpSchema.findByIdAndDelete(Sendedotp._id);

    //hash new password
    const hashedPassword = await bcrypt.hash(newpassword, 12);

    //if Otp Matches change PassWord in db
    const response = await User.findByIdAndUpdate(userId, {
      password: hashedPassword,
    });

    //send res
    return res.status(200).json({
      success: true,
      data: response,
      message: "Password Changes Successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      data: err.message,
      message: "Internal Server Error",
    });
  }
};

export const getUserDetails = async (req, res) => {
  try {
    const UserId = req.user._id;

    const user = await User.findById(UserId);

    if (!user) {
      return res.json({
        msg: "User Not Found",
      });
    }

    return res.status(200).json({
      success: true,
      msg: "User Fetched Successfully",
      userdata :user
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      data: err.message,
      message: "Internal Server Error",
    });
  }
};
