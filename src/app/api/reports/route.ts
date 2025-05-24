import { NextRequest, NextResponse } from 'next/server';
import { getAllReports, getReportById, updateReportStatus } from '@/lib/reports-db';
import { getServerSession } from 'next-auth/next';

// GET handler to fetch all reports
export async function GET(req: NextRequest) {
  try {
    // For a real app, you'd want to check authentication here
    // const session = await getServerSession();
    // if (!session) {
    //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    // }
    
    // Check if requesting a specific report by ID
    const url = new URL(req.url);
    const reportId = url.searchParams.get('id');
    
    if (reportId) {
      // Fetch a single report by ID
      const report = await getReportById(reportId);
      
      if (!report) {
        return NextResponse.json(
          { error: 'Report not found' },
          { status: 404 }
        );
      }
      
      return NextResponse.json({ report });
    }
    
    // Fetch all reports
    const reports = await getAllReports();
    
    return NextResponse.json({ reports });
  } catch (error) {
    console.error('Error fetching reports:', error);
    
    return NextResponse.json(
      { error: 'Failed to fetch reports' },
      { status: 500 }
    );
  }
}

// POST handler to update a report status
export async function POST(req: NextRequest) {
  try {
    // For a real app, you'd want to check authentication here
    // const session = await getServerSession();
    // if (!session) {
    //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    // }
    
    const body = await req.json();
    const { reportId, status } = body;
    
    if (!reportId || !status) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    const success = await updateReportStatus(reportId, status);
    
    if (!success) {
      return NextResponse.json(
        { error: 'Failed to update report status' },
        { status: 500 }
      );
    }
    
    return NextResponse.json({
      message: 'Report status updated successfully'
    });
  } catch (error) {
    console.error('Error updating report status:', error);
    
    return NextResponse.json(
      { error: 'Failed to update report status' },
      { status: 500 }
    );
  }
} 