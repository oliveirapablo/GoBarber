import { Router, json } from 'express';
import { getCustomRepository } from 'typeorm';
import { startOfHour, parseISO } from 'date-fns';

import AppointmentsReposity from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';

const appointmentsRouter = Router();

appointmentsRouter.get('/', async (request, response) => {
    const appointmentsReposity = getCustomRepository(AppointmentsReposity);
    const appointments = await appointmentsReposity.find();

    return response.json(appointments);
});

appointmentsRouter.post('/', async (request, response) => {
    try {
        const { provider_id, date } = request.body;

        const parsedDate = parseISO(date);

        const createAppointment = new CreateAppointmentService();

        const appointment = await createAppointment.execute({
            provider_id,
            date: parsedDate,
        });


        return response.json(appointment);
    } catch (err) {
        return response.status(400).json({ erro: err.message })
    };
});
export default appointmentsRouter;
