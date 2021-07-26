const GetAlluser = async (req, res) => {
    try {
        res.json("done")
    } catch (err) {
        console.log(err)
    }
};
const AddUser = async (req, res) => {
    try {
        console.log(req.body)
        res.json("ADD User Success")
    } catch (err) {
        console.log(err)
    }
}
module.exports = {
    GetAlluser: GetAlluser,
    AddUser: AddUser
}