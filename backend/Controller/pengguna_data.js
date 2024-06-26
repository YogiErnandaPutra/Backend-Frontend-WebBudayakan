import { query } from "../DATABASE/db.js";

export const getpengguna_data = async (req, res) => {
    try {
        const pengguna_data = await query("SELECT * FROM penguna_data");
        return res.status(200).json({ success: true, data: pengguna_data });
    } catch (error) {
        console.error("terjadi kesalahan:", error);
        return res.status(500).json({msq:"terjadi kesalahan pada server" });
    }
};
