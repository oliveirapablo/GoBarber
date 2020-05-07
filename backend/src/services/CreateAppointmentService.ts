import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';


import Appointment from '../models/Appointment';
import AppointmentsReposity from '../repositories/AppointmentsRepository';

interface Reqeuest {
    provider_id: string;
    date: Date;
}
/**
 * Dependecy Inversion
*/
class CreateAppointmentService {

    public async execute({ provider_id, date }: Reqeuest): Promise<Appointment> {
        const appointmentsReposity = getCustomRepository(AppointmentsReposity);

        const appointmentDate = startOfHour(date);

        const findAppointmentInSameDate = await appointmentsReposity.findByDate(
            appointmentDate);

        if (findAppointmentInSameDate) {
            throw Error('This appointment is already booked');
        }

        const appointment = appointmentsReposity.create({
            provider_id,
            date: appointmentDate,
        });

        await appointmentsReposity.save(appointment);

        return appointment;
    }
}

export default CreateAppointmentService;
