import { NextRequest, NextResponse } from 'next/server';

// Import the users array from the NextAuth configuration
// In a real application, this would be stored in a database
import { users } from '../users';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, password } = body;

    // Validation
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
      return NextResponse.json(
        { error: 'Email already in use' },
        { status: 409 }
      );
    }

    // Create new user
    // In a real app, you would hash the password and use a database
    const newUser = {
      id: `${users.length + 1}`,
      name,
      email,
      password, // In production, this would be hashed
    };

    // Add user to array
    users.push(newUser);

    // Return success without exposing password
    return NextResponse.json(
      { 
        user: {
          id: newUser.id,
          name: newUser.name,
          email: newUser.email
        },
        message: 'User registered successfully' 
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Registration failed' },
      { status: 500 }
    );
  }
} 