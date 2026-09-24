import { Request, Response, Router } from 'express';
import { Document, Model } from 'mongoose';

function handleError(error: unknown, response: Response): void {
  const status = error instanceof Error && error.name === 'CastError' ? 400 : 500;
  response.status(status).json({ error: status === 400 ? 'Invalid resource id' : 'Internal server error' });
}

export default function createCrudRouter<T extends Document>(model: Model<T>): Router {
  const router = Router();

  router.get('/', async (_request: Request, response: Response) => {
    try {
      response.json(await model.find().sort({ createdAt: -1 }));
    } catch (error) {
      handleError(error, response);
    }
  });

  router.post('/', async (request: Request, response: Response) => {
    try {
      const resource = await model.create(request.body);
      response.status(201).json(resource);
    } catch (error) {
      handleError(error, response);
    }
  });

  router.get('/:id', async (request: Request, response: Response) => {
    try {
      const resource = await model.findById(request.params.id);
      if (!resource) {
        response.status(404).json({ error: 'Resource not found' });
        return;
      }
      response.json(resource);
    } catch (error) {
      handleError(error, response);
    }
  });

  router.put('/:id', async (request: Request, response: Response) => {
    try {
      const resource = await model.findByIdAndUpdate(request.params.id, request.body, {
        new: true,
        runValidators: true,
      });
      if (!resource) {
        response.status(404).json({ error: 'Resource not found' });
        return;
      }
      response.json(resource);
    } catch (error) {
      handleError(error, response);
    }
  });

  router.delete('/:id', async (request: Request, response: Response) => {
    try {
      const resource = await model.findByIdAndDelete(request.params.id);
      if (!resource) {
        response.status(404).json({ error: 'Resource not found' });
        return;
      }
      response.status(204).send();
    } catch (error) {
      handleError(error, response);
    }
  });

  return router;
}