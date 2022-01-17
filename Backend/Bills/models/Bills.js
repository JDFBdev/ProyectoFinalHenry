const mongoose = require("mongoose");
let fecha = new Date()
fecha = fecha.toLocaleString()

const BillsSchema = new mongoose.Schema(
  {
    idUser: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    products: [],
    status: {
      type: String,
      default: "Open",
    },
    date: {
        type: Date,
        default: Date.now()
    },
    subTotal: {
      type: Number,
      default: 0,
    },
    total: {
      type: Number,
      default: 0,
    },
    numeroMesa : {
      type: Number,
      default: 0
    },
    tipoDePedido: {
      type: String,
      required: true,
    },
    statusCocina: {
      type: String,
      default: "Open" 
    },
    fechaEntrega: {
      type: String,
      default: fecha,
      required: true
    }
  },
  { timestamps: false }
);

module.exports = mongoose.model("Bills", BillsSchema);

