import mongoose, { model, Schema } from "mongoose";

const freindSchema = new Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'Auth'
    },
    freind: {
        type: mongoose.Types.ObjectId,
        ref: 'Auth'
    }, 
    status: {
        type: String,
        enum: ['requested', 'accepted'],
        default: 'requested'
    },
}, {timestamps: true})

freindSchema.pre("save", async function(next){
    try {
        const count = await model("Freind").countDocuments({user: this.user, freind: this.freind})
        if(count > 0)
            throw next(new Error("Freind request already sent"))
        next()
    } catch(error) {
        throw next(new Error("Failed to send freind request"))
    }
})

const FreindModel = model("Freind", freindSchema)
export default FreindModel