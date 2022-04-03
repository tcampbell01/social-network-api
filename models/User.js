const { Schema, model } = require('mongoose');


const UserSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: 'You need to provide a username name!',
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, 'Please enter a valid e-mail address']
    },
    
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User'
      }
    ],
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Thought'
      }
    ]
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
  
    id: false,
  }
);




// get total count of comments and replies on retrieval
UserSchema.virtual('friendCount').get(function() {
  return this.friends.length;
});

const User = model('User', UserSchema);
module.exports = User;
