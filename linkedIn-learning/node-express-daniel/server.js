const path = require("path");
const express = require("express");
const cookieSession = require("cookie-session");

const routes = require("./routes");
const SpeakerService = require("./services/SpeakerService");
const FeedbackService = require("./services/FeedbackService");

const app = express();
const port = 3000;

const speakersService = new SpeakerService("./data/speakers.json");
const feedbackService = new FeedbackService("./data/feedback.json");

app.set("trust proxy", 1);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "./views"));

app.locals.siteName = "ROUX Meetups";

app.use(express.static(path.join(__dirname, "./static")));

app.use(async (req, res, next) => {
  try {
    const names = await speakersService.getNames();
    res.locals.speakerNames = names;
    return next();
  } catch (err) {
    return next(err);
  }
});

app.use(
  cookieSession({
    name: "session",
    keys: ["JHhfdjKD8493j", "fjkJF89FHkf"],
  })
);

app.use(
  "/",
  routes({
    speakersService,
    feedbackService,
  })
);

app.listen(port, () => {
  console.log(`Express server listening on port ${port}`);
});
