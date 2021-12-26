import UserModel from "./models/user.js";

export const sumPersons = async (timeSlot) => {
    const personCount = await UserModel.find({
        zeit: timeSlot,
    });
    let counter = 0;
    Array.from(personCount).forEach(person => counter += person.personen);
    return counter;
};