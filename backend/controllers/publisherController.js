const publisherService = require('../services/publisherService')

const publisherController = {
    // Handle user register
    addPublisher: async (req, res) => {
        const {user_id, publisher_name, description} = req.body;

        if (!publisher_name || !description){
            return res.status(400).json({success:false, message: "Publisher name is required"})
        }
        try {
            const publisher = await publisherService.addPublisher({user_id, publisher_name, description});
            return res.status(201).json({success:true, message: 'Publisher created successfully!', publisher})
            
        } catch (error) {
            console.error("Publisher Registration error", error);
            return res.status(500).json({success:false, message: error.message})
        }
    },
    getPublisher: async (req, res) => {
        const {publisher_id} = req.body

        params = {
            publisher_id: publisher_id
        }

        if (!publisher_id){
            return res.status(400).json({success: false, message: 'publisher_id are required'})
        }

        try {
            const publisher = await publisherService.getPublisher(params)
            res.status(200).json({
                publisher: publisher,
                success:true,
            })
            
        } catch (error) {
            console.error('Error fetching publisher details', error)
            res.status(401).json({success:false, message: error.message})
            
        }
    }
}

module.exports = publisherController