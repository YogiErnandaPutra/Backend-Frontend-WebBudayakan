import { query } from "../DATABASE/db.js";


export const addpengguna_data = async (req, res) => {
    try {
        const { idpenguna_data, username, password } = req.body;
        await query("INSERT INTO penguna_data (idpenguna_data,username, password) VALUES (?, ?, ?)", [
            idpenguna_data,
            username,
            password
        ]);
        return res.status(200).json({ msq: "data tersimpan" });
    } catch (error) {
        return res.status(500).json({msq:"terjadi kesalahan pada server" });
    }
};
