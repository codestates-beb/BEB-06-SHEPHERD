import Schema from 'validate';

export const transaction = new Schema(
  {
    arrival: {
      date: '2022.10.10',
      location: {
        type: String,
        required: true
      }
    },
    currentLocation: {
      type: String,
      required: true
    },
    departure: {
      date: '2022.10.9',
      location: {
        type: String,
        required: true
      }
    },
    orderDate: '2011.10.9',
    orderer: {
      type: String,
      required: true
    },
    status: {
      type: String,
      enum: ['Ongoing', 'Ready', 'Complete'],
      required: true
    }
  }
);
