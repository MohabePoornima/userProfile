const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const { User } = require("../models/user.model");
const { BASE_URL } = require("../utils/url");


passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `${BASE_URL}/auth/google/callback`
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails[0].value;
        let user = await User.findOne({ email });
        console.log(user)

        if (!user) {
          user = new User({
            name: profile.displayName,
            email: email,
            mobileNumber: "", 
            city: "",
            pincode: "",
            profileImage: profile.photos?.[0]?.value || ""
          });
          await user.save();
        }

        return done(null, user); 
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user._id); 
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id); 
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});
