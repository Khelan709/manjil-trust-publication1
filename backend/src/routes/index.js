import { Router } from 'express';
import { isDbReady } from '../config/db.js';
import publicContentRoutes from './publicContentRoutes.js';
import authRoutes from './authRoutes.js';
import adminRoutes from './adminRoutes.js';
import contactRoutes from './contactRoutes.js';
import newsletterRoutes from './newsletterRoutes.js';
import sampleRequestRoutes from './sampleRequestRoutes.js';
import waiverRoutes from './waiverRoutes.js';

const router = Router();

router.get('/health', (_req, res) => res.json({ status: 'ok', database: isDbReady() ? 'connected' : 'disconnected', uptime: process.uptime() }));

// public
router.use('/content', publicContentRoutes);
router.use('/contact', contactRoutes);
router.use('/newsletter', newsletterRoutes);
router.use('/sample-requests', sampleRequestRoutes);
router.use('/waiver-requests', waiverRoutes);

// admin
router.use('/auth', authRoutes);
router.use('/admin', adminRoutes);

export default router;
