const ServiceProvider = require('../models/serviceProvider')
const Gallery = require('../models/gallery')
const adminCltr = {}

// adminCltr.approveServiceProvider = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const serviceProvider = await ServiceProvider.findByIdAndUpdate(id, { isApproved: true }, { new: true });
//         res.status(200).json(serviceProvider);
//     } catch (err) {
//         console.log(err);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// }

// adminCltr.approveGallery = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const gallery = await Gallery.findByIdAndUpdate(id, { isApproved: true }, { new: true });
//         res.status(200).json(gallery);
//     } catch (err) {
//         console.log(err);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// }

module.exports = adminCltr;
