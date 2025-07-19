const userModel = require("../models/userModel");


// all data is fetchuserdata
const fetchdatauser = async (req, res) => {
    try {
        const Userdata = await userModel.find({});

        if (Userdata) {
            res.status(200).json({ msg: "userdata is record found....?", records: Userdata });
        } else {
            res.status(200).json({ msg: "userdata is record notfound....", records: Userdata });
        }

    } catch {
        res.status(400).json({ msg: "Somethinng data is wrong...?", err: e });

    }
}


const insertdatauser = async (req, res) => {
    console.log(req.body);

    try {
        const insertdata = await userModel.create(req.body);
        if (insertdata) {
            res.status(201).json({ insert: true, msg: "Userdata is Inserted Successfully...." });
        }
        else {
            res.status(400).json({ insert: false, msg: "Userdata is  Insertion Failed...." });
        }
    } catch (e) {
        res.status(400).json({ msg: "Somethinng data is wrong...?", err: e });
    }
}

const deletdatauser = async (req, res) => {
    try {
        const deletdatauser = await userModel.findByIdAndDelete(req.params.id);
        if (deletdatauser) {
            res.status(201).json({ insert: true, msg: "Userdata is delet Successfully...." });
        } else {
            res.status(400).json({ insert: false, msg: "Userdata is  Insertion Failed...." });
        }

    } catch (e) {
        res.status(400).json({ msg: "Somethinng data is wrong...?", err: e });
    }

}

const upadetdatauser = async (req, res) => {
    try {
        const upadetdatauser = await userModel.findByIdAndUpdate(req.params.id, req.body);
        if (upadetdatauser) {
            res.status(201).json({ insert: true, msg: "User data is uapdeted Successfully...? " });
        } else {
            res.status(400).json({ insert: false, msg: "User data is not uapdeted ...." });
        }

    } catch (e) {
        res.status(400).json({ msg: "Somethinng data is wrong...?", err: e });
    }

}

module.exports = {
    fetchdatauser,
    insertdatauser,
    deletdatauser,
    upadetdatauser,
}