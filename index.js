import express from "express";
import { PrismaClient } from "@prisma/client";
const app = new express();

const prisma = new PrismaClient();

app.use(express.json());

app.get("/", async (req, res) => {
    const allUsers = await prisma.user.findMany();
    try {
        res.json({
            allUsers,
        });
    } catch (error) {
        res.json({
            error,
        });
    }
});

app.post("/", async (req, res) => {
    try {
        const { firstName, lastName, age } = req.body;
        const newUser = await prisma.user.create({
            data: {
                firstName,
                lastName,
                age,
            },
        });
        res.json({
            newUser,
        });
    } catch (error) {
        res.json({
            error,
        });
    }
});

app.put("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const { firstName, lastName, age } = req.body;
        const updatedUser = await prisma.user.update({
            where: { id: id },
            data: {
                firstName,
                lastName,
                age,
            },
        });
        res.json(updatedUser);
    } catch (error) {
        res.json({
            error,
        });
    }
});

app.delete("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const deletedUser = await prisma.user.delete({
            where: { id: id },
        });
        res.json({
            deletedUser,
        });
    } catch (error) {
        res.json({
            error,
        });
    }
});

app.post("/house", async (req, res) => {
    try {
        const { address, wifiPassword, ownerId, builtById } = req.body;
        const newHouse = await prisma.house.create({
            data: {
                address,
                wifiPassword,
                ownerId,
                builtById,
            },
        });
        res.json({
            newHouse,
        });
    } catch (error) {
        console.log(error);
        res.json({
            error,
        });
    }
});

app.get("/house", async (req, res) => {
    try {
        const allHouses = await prisma.house.findMany({
            include: {
                owner: true,
                builtBy: true,
            },
        });
        res.json({
            allHouses,
        });
    } catch (error) {
        console.log(error);
        res.json({
            error,
        });
    }
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
