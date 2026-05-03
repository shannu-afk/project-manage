import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/ethran');

async function seedAdmin() {
  await mongoose.connection.dropDatabase();
  const hash = await bcrypt.hash('admin123', 10);
  const User = await import('./models/User').then(m => m.default);
  await User.create({name: 'Admin', email: 'admin123@gmail.com', password: hash, role: 'Admin'});
  console.log('✅ Admin seeded: email=admin123@gmail.com, password=admin123');
  mongoose.connection.close();
}
seedAdmin().catch(console.error);

