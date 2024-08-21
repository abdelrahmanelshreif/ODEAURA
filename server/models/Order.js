// const mongoose = require('mongoose')
// const AutoIncrement = require('mongoose-sequence')(mongoose)


// const orderSchema = new mongoose.Schema({
//   userId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'user',
//     required: true,
//   },
//   items: [
//     {
//       productId: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'product',
//         required: true,
//       },
//       quantity: {
//         type: Number,
//         default: 1,
//         required: true,
//         min: [1, 'Quantity can not be less than 1.'],
//       },
//       price: {
//         type: Number,
//         ref: 'product.price',
//         required: true,
//       },
//       totalPrice: {
//         type: Number,
//         required: true,
//       },
//     },
//   ],
//   subTotal: {
//     type: Number,
//     default: 0,
//     required: true,
//     min: [0, 'Subtotal must be a positive number.'],
//   },
//   shippingCost: {
//     type: Number,
//     default:0 ,
//     required: true,
//     min: [0, 'Shipping cost must be a positive number.'],
//   },
//   totalCost: {
//     type: Number,
//     required: true,
//     default: 0,
//     min: [0, 'Total cost must be a positive number.'],
//   },
//   shippingAddress: {
//     street: {
//       type: String,
//     },
//     city: {
//       type: String,
//     },
//     state: {
//       type: String,
//     },
//     zip: {
//       type: String,
//     },
//     country: {
//       type: String,
//     },
//     mobileNumber:{
//       type: String
//     }
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now(),
//   },
// })

// orderSchema.pre('save', async function (next) {
//   this.totalCost = this.shippingCost + this.subTotal
//   next()
// })

// const Order = mongoose.model('order', orderSchema)

// module.exports = { Order }

const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose)

const orderSchema = new mongoose.Schema({
  orderNumber: {
    type: Number,
    unique: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  items: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'product',
        required: true,
      },
      quantity: {
        type: Number,
        default: 1,
        required: true,
        min: [1, 'Quantity can not be less than 1.'],
      },
      price: {
        type: Number,
        required: true,
      },
      totalPrice: {
        type: Number,
        required: true,
      },
    },
  ],
  subTotal: {
    type: Number,
    default: 0,
    required: true,
    min: [0, 'Subtotal must be a positive number.'],
  },
  shippingCost: {
    type: Number,
    default: 0, // Added default value here
    required: true,
    min: [0, 'Shipping cost must be a positive number.'],
  },
  totalCost: {
    type: Number,
    required: true,
    default: 0,
    min: [0, 'Total cost must be a positive number.'],
  },
  shippingAddress: {
    street: {
      type: String,
    },
    city: {
      type: String,
    },
    state: {
      type: String,
    },
    // zip: {
    //   type: String,
    // },
    country: {
      type: String,
    },
    mobileNumber: {
      type: String,
    },
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
})

orderSchema.plugin(AutoIncrement, { inc_field: 'orderNumber', start_seq: 1 })

orderSchema.pre('save', async function (next) {
  this.totalCost = this.shippingCost + this.subTotal
  next()
})

const Order = mongoose.model('order', orderSchema)

module.exports = { Order }
