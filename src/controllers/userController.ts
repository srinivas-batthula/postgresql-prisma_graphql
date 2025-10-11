import type { Request, Response } from "express";
import prisma from "../../prisma/prisma.ts";


const getAll = async (req: Request, res: Response) => {
    try {
        const users = await prisma.user.findMany({
            orderBy: { createdAt: 'desc' }
        });

        return res.status(200).json({ success: true, msg: "Users fetched successfully!", users });
    } catch (error: any) {
        return res.status(500).json({ success: false, msg: error.message });
    }
}

const getById = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params?.id);
        if (!id)
            return res.status(400).json({ success: false, msg: "`id` is required!" });

        const user = await prisma.user.findUnique({ where: { id } });

        return res.status(200).json({ success: true, msg: "User fetched successfully!", user });
    } catch (error: any) {
        return res.status(500).json({ success: false, msg: error.message });
    }
}

const create = async (req: Request, res: Response) => {
    try {
        const { email, name = '' } = req.body || {};
        if (!email || email.trim().length === 0)
            return res.status(400).json({ success: false, msg: "Email is required!" });

        const user = await prisma.user.create({ data: { email, name } });

        return res.status(201).json({ success: true, msg: "User Created successfully!", user });
    } catch (error: any) {
        return res.status(500).json({ success: false, msg: error.message });
    }
}

const updateById = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params?.id);
        if (!id)
            return res.status(400).json({ success: false, msg: "`id` is required!" });

        const { email, name } = req.body || {};
        if ((!email || email.trim().length === 0) && (!name || name.trim().length === 0))
            return res.status(400).json({ success: false, msg: "Payload is required to Update!" });

        // Build updateData payload...
        const updateData: { name?: string, email?: string } = {};
        if (name && name.trim().length !== 0)
            updateData.name = name;
        if (email && email.trim().length !== 0)
            updateData.email = email;

        const user = await prisma.user.update({ where: { id }, data: updateData });

        return res.status(200).json({ success: true, msg: "User Updated successfully!", user });
    } catch (error: any) {
        return res.status(500).json({ success: false, msg: error.message });
    }
}

const deleteById = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params?.id);
        if (!id)
            return res.status(400).json({ success: false, msg: "`id` is required!" });

        const user = await prisma.user.delete({ where: { id } });

        return res.status(200).json({ success: true, msg: "User Deleted successfully!", user });
    } catch (error: any) {
        return res.status(500).json({ success: false, msg: error.message });
    }
}

export { getAll, getById, create, updateById, deleteById };
