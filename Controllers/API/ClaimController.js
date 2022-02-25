const appRoot = require("app-root-path");
const Controller = require(`${appRoot}/Engine/Controller`);
const Claim = require(`${appRoot}/Models/ClaimModel`)
const Pet = require(`${appRoot}/Models/PetModel`);

class ClaimController extends Controller {
    constructor() {
        super("claim",true);//Prefix all routes with /api/claim

        //Returns all claims
        this.router.get('/', async (req, res) => {
            res.json(await Claim.find())
        });

        //Returns a specific Claim
        this.router.get('/:id', async (req, res) => {
            try {
                res.json(await Claim.findById(req.params.id))
            }
            catch(err){
                res.status(404).json({message: `Claim with ID ${req.params.id} not found`})
            }
        });

        //Returns the pet associated with a specific claim
        this.router.get('/:id/pet', async (req, res) => {
            try {
                const claim = await Claim.findById(req.params.id)
                res.json(await Pet.findById(claim.pet).populate('pet'))
            }
            catch(err){
                res.status(404).json({message: `Claims for Claim with ID ${req.params.id} not found`})
            }
        });

        //Create a new claim
        this.router.post('/', async (req, res) => {
            const newClaim = new Claim(req.body);
            try {
                const item = await newClaim.save()
                res.json(await Claim.findById(item.id))
            }
            catch (err) {
                res.status(400).json({"message" : err.message})
            }
        });

        //Update an existing claim
        this.router.post('/:id', async (req, res) => {
            try {
                res.json(await Claim.findOneAndUpdate({id: req.params.id}, req.body, {new: true}))
            }
            catch(err) {
                res.status(400).json({"message" : err.message})
            }
        });

        //Delete an existing claim
        this.router.delete('/:id',  async (req, res) => {
            try {
                await Claim.findOneAndDelete({id: req.params.id})
                res.json({message: `Claim with ID ${req.params.id} deleted`})
            }
            catch(err) {
                res.status(404).json({"message" : err.message})
            }
        });

    }
}

const Con = new ClaimController();
module.exports = Con.router;