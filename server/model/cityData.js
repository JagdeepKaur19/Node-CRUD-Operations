var Schema = mongoose.Schema;

var city = new Schema({
    id: String,
    certificate_number: Number,
    business_name: String,
    date: Date,
    result: String,
    sector: String,
    address: [{ city: String, zip:Number, street: String, number: Number }]

}, { collection: 'cityData'});

mongoose.model( 'cityData', city )