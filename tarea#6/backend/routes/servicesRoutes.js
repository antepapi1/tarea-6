import express from 'express'
import { 
  createService, 
  getServices, 
  getServiceById, 
  UpdatedService, 
  deleteService, 
  deleteManyServices, 
  createManyServices 
} from '../controllers/servicesController.js'

const router = express.Router()

// CRUD básico
router.post('/', createService)
router.get('/', getServices)
router.get('/:id', getServiceById)
router.put('/:id', UpdatedService)
router.delete('/:id', deleteService)

// Operaciones masivas
router.delete('/', deleteManyServices)     // body: { "ids": ["id1","id2"] }
router.post('/bulk', createManyServices)   // body: { "items": [{name,price}, ...] }

export default router
