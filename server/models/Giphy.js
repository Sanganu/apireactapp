const { Schema, model } = require('mongoose');
const formatDate = require("./utils/dateFormat")



const giphySchema = new Schema(
  {
    gifid: {
      type: String,
      required: true,
      unique: true,
    },
    fixed_height_small: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, 'Must use a valid email address'],
    },
    fixed_height_still: {
      type: String,
      required: true,
    },
    // set savedBooks to be an array of data that adheres to the bookSchema
    Likes: {
      type: Number,
    },
    disLikes:{
      type:Number
    },
    createdDate:{
      type: Date,
      default: Date.now,
      get: timestamp => formatDate(timestamp)

    },
    ratings:{
      type: String,
      minlength:1,
      maxlength:1
    },
    comments: [
      {
        type:String,
        // validate: {

        // }
      }
    ]
  },
  // set this to use virtual below
  {
    toJSON: {
      virtuals: true,
    },
  }
);

// hash user password
// giphySchema.pre('save', async function (next) {
//   if (this.isNew || this.isModified('password')) {
//     const saltRounds = 10;
//     this.password = await bcrypt.hash(this.password, saltRounds);
//   }

//   next();
// });

// // custom method to compare and validate password for logging in

// // when we query a user, we'll also get another field called `bookCount` with the number of saved books we have
// giphySchema.virtual('').get(function () {
//   return this.savedBooks.length;
// });

const Giphy = model('Giphy', giphySchema);

module.exports = Giphy;
