import express from "express"
import { getpengguna_data } from "../Controller/pengguna_data.js";
import { addpengguna_data } from "../Controller/addpengguna_data.js";
import { login, register } from "../Controller/auth.js";


const router = express.Router();

router.get("/getdata", getpengguna_data);
router.post("/adddata", addpengguna_data);
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
      const result = await login(email, password);
      if (result.success) {
          res.status(200).json(result);
      } else {
          res.status(401).json(result);
      }
  } catch (error) {
      res.status(500).json({ success: false, message: 'Internal server error' });
  }
});



// Register endpoint
router.post('/register', async (req, res) => {
    const { nama, email, telepon, password } = req.body;
    try {
        const result = await register(nama, email, telepon, password);
        if (result.success) {
            res.status(201).json(result);
        } else {
            res.status(400).json(result);
        }
    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});
export default router; 

