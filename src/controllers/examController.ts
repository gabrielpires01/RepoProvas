import { exams } from "@prisma/client";
import { Request, Response } from "express";
import * as examService from "../services/examService.js"

export type ExamType = Omit<exams,"id"|"createdAt">

export type GroupBy = "discipline" | "instructor"

const create = async (req:Request, res: Response) => {
    const exam: ExamType = req.body;

    await examService.create(exam);

    return res.sendStatus(201)
};

const get = async(req:Request, res:Response) => {
    const groupBy = req.query.groupBy as GroupBy;

    let exams = await examService.get(groupBy)
    
    return res.send(exams)
}

export {
    create,
    get
}