const appRoot = require("app-root-path");
const Controller = require(`${appRoot}/Engine/Controller`);
const Pet = require(`${appRoot}/Models/PetModel`)
const Claim = require(`${appRoot}/Models/ClaimModel`)
       
class PetController extends Controller {
    constructor() {
        super("pet",true); //Prefix all routes with /api/pet

        // Returns all pets
        this.router.get('/', async (req, res) => {
            res.json(await Pet.find())
        });

        //Returns specific pet
         this.router.get('/:id', async (req, res) => {
             try {
                 res.json(await Pet.findById(req.params.id))
             }
            catch(err){
                     res.status(404).json({message: `Pet with ID ${req.params.id} not found`})
             }
        });

         //Returns all claims of a specific pet
        this.router.get('/:id/claims', async (req, res) => {
            try {
                const pet = await Pet.findById(req.params.id);
                res.json(await Claim.find({pet: pet._id}))
            }
            catch(err){
                res.status(404).json({message: `Claims for Pet with ID ${req.params.id} not found`})
            }
        });

        //Create a new pet
        this.router.post('/', async (req, res) => {
            const newPet = new Pet(req.body);
            try {
                const item = await newPet.save()
                res.json(await Pet.findById(item.id))
            }
            catch (err) {
                res.status(400).json({"message": err.message})
            }
        });

        //Update an existing pet
        this.router.post('/:id', async (req, res) => {
            try {
                const result = await Pet.findOneAndUpdate({id: req.params.id}, req.body, {new: true})
                if (result !== null)
                    res.json(result)
                else
                    res.status(404).json({message: `Pet with ID ${req.params.id} not found`})
            }
            catch(err) {
                res.status(400).json({"message" : err.message})
            }
        });

        //Delete a pet
        this.router.delete('/:id',  async (req, res) => {
            try {
                await Pet.findOneAndDelete({id: req.params.id})
                res.json({message: `Pet with ID ${req.params.id} deleted`})
            }
            catch(err) {
                res.status(404).json(err)
            }
        });

    }
}

const Con = new PetController();
module.exports = Con.router; 