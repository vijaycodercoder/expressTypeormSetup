import express from "express";
import { AppDataSource } from "../db";
import { User } from "../entites/User";
const router = express.Router()

router.get('/', async function (req, res) {

    const userRepository = AppDataSource.getRepository(User)
    const allUsers = await userRepository.find();

    res.json({ data: allUsers })

})

router.post('/test', async function (req, res) {

    const userRepository = AppDataSource.getRepository(User)
    const newUser = new User();
    newUser.name = req.body.name
    newUser.age = req.body.age
    newUser.number = req.body.number
    newUser.isPublished = req.body.isPublished
    await userRepository.save(newUser)

    const find = await AppDataSource.getRepository(User).find()
    res.json({ message: 'User created successfully', data: find })
})
router.post('/update', async function (req, res) {

    const userRepository = AppDataSource.getRepository(User)


    const update = await userRepository.findOneBy({ id: req.body.id })
    console.log('update', update)
    const aaaa: any = update
    aaaa.name = req.body.name
    aaaa.age = req.body.age
    aaaa.number = req.body.number
    aaaa.isPublished = req.body.isPublished


    await userRepository.save(aaaa)

    const find = await AppDataSource.getRepository(User).find()
    res.json({ message: 'User update successfully', data: find })
})

router.put('/:id', async function (req, res) {
    const userId: number = Number(req.params.id)
    const userRepository = AppDataSource.getRepository(User)
    const add = await userRepository.findOneBy({ id: userId })
    res.json({ message: 'select id', data: add })
    // res.json({ message: `update ${req.params.id}` })
})

router.delete('/:id', async function (req, res) {
    console.log('req', req)
    const userId: number = Number(req.params.id)
    const userRepository = AppDataSource.getRepository(User)
    const userToDelete: any = await userRepository.findOneBy({ id: userId })
    console.log('req', userToDelete)
    await userRepository.remove(userToDelete);

    const updatedUsers = await userRepository.find();
    res.json({ data: updatedUsers })
})

module.exports = router;