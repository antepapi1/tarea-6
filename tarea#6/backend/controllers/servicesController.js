import Services from '../models/Services.js'
import { validateObjectId, handleNotFoundError } from '../utils/index.js'

// POST: crear 1
export const createService = async (req, res) => {
  try {
    const { name, price } = req.body
    if (!name || price === undefined || price === null || name.trim() === '') {
      return res.status(400).json({ msg: 'Todos los campos son obligatorios' })
    }
    const service = await Services.create({ name: name.trim(), price })
    return res.status(201).json(service)
  } catch (error) {
    console.error(error)
    return res.status(500).json({ msg: 'Error al crear el servicio' })
  }
}

// GET: listar todos
export const getServices = async (req, res) => {
  try {
    const items = await Services.find().sort({ createdAt: -1 })
    return res.json(items)
  } catch (error) {
    console.error(error)
    return res.status(500).json({ msg: 'Error al obtener servicios' })
  }
}

// GET: por ID
export const getServiceById = async (req, res) => {
  const { id } = req.params
  if (validateObjectId(id, res)) return
  const item = await Services.findById(id)
  if (!item) return handleNotFoundError('Servicio no existe', res)
  return res.json(item)
}

// PUT: actualizar por ID
export const UpdatedService = async (req, res) => {
  const { id } = req.params
  if (validateObjectId(id, res)) return
  try {
    const updated = await Services.findByIdAndUpdate(id, req.body, { new: true, runValidators: true })
    if (!updated) return handleNotFoundError('Servicio no existe', res)
    return res.json(updated)
  } catch (error) {
    console.error(error)
    return res.status(500).json({ msg: 'Error al actualizar' })
  }
}

// DELETE: eliminar por ID
export const deleteService = async (req, res) => {
  const { id } = req.params
  if (validateObjectId(id, res)) return
  try {
    const deleted = await Services.findByIdAndDelete(id)
    if (!deleted) return handleNotFoundError('Servicio no existe', res)
    return res.json({ msg: 'El Servicio se ha eliminado correctamente', id })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ msg: 'Error al eliminar' })
  }
}

// DELETE: eliminación masiva por IDs
export const deleteManyServices = async (req, res) => {
  const { ids } = req.body
  if (!Array.isArray(ids) || ids.length === 0) {
    return res.status(400).json({ msg: 'Debes enviar un arreglo ids con al menos 1 id' })
  }
  const invalid = ids.filter(id => !id || id.length !== 24)
  if (invalid.length) return res.status(400).json({ msg: 'Uno o más IDs no son válidos', invalid })
  try {
    const result = await Services.deleteMany({ _id: { $in: ids } })
    return res.json({ deletedCount: result.deletedCount })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ msg: 'Error al eliminar masivamente' })
  }
}

// POST: inserción masiva
export const createManyServices = async (req, res) => {
  const { items } = req.body
  if (!Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ msg: 'Debes enviar un arreglo items con al menos 1 elemento' })
  }
  try {
    const inserted = await Services.insertMany(items, { ordered: false })
    return res.status(201).json({ insertedCount: inserted.length, items: inserted })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ msg: 'Error al insertar masivamente', error: error.message })
  }
}
