import { Request, Response } from 'express';
import { getCustomRepository, getRepository } from 'typeorm';
import { UsersRepository } from '../repositories/UsersRepository';
import * as yup from 'yup';

class UserController {
    async create(req: Request, res: Response) {
        const { name, email } = req.body;

        const schema = yup.object().shape({
            name: yup.string().required(),
            email: yup.string().email().required()
        });

        // 1ª forma de validar
        // if(!(await schema.isValid(req.body))) {
        //     return res.status(404).json({ error: 'Validation Failed!' });
        // }

        // 2ª forma de validar
        try {
           await schema.validate(req.body, { abortEarly: false });
        } catch (error) {
            return res.status(404).json({ error: error });
        }

        const usersRepository = getCustomRepository(UsersRepository);

        const userAlreadyExists = await usersRepository.findOne({
            email
        });

        if(userAlreadyExists) {
            return res.status(400).json({
                error: "User already exists"
            });
        }

        const user = usersRepository.create({
            name, email
        })

        await usersRepository.save(user);

        return res.status(201).json(user);
    }
}

export { UserController };