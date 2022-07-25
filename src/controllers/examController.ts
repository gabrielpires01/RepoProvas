import { exams } from "@prisma/client";
import { Request, Response } from "express";
import * as examService from "../services/examService.js"

export type ExamType = Omit<exams,"id"|"createdAt">

const create = async (req:Request, res: Response) => {
    const exam: ExamType = req.body;

    await examService.create(exam);

    return res.sendStatus(201)
};

export {
    create,
}