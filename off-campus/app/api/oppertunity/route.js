import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";
import connectDB from "@/lib/db";
import oppertunity from "@/model/oppertunity";

export async function GET() {
    try {
        await connectDB();
        const all = await oppertunity.find({}, {
            company: 1,
            companyImage: 1,
            title: 1,
            deadline: 1,
            officeLocation: 1,
            applyLink: 1,
            jobDescription: 1,
            opportunityType: 1,
            durationWeeks: 1,
            joiningDate: 1,
            graduationYear: 1,
            compensation: 1,
            eligibility: 1,
            contact: 1,
        }).sort({ deadline: 1 });
        return new Response(JSON.stringify(all), { status: 200 });
    } catch (error) {
        return new Response("Failed to fetch opportunities", { status: 500 });
    }
}



export async function POST(request) {
    const session = await getServerSession(authOptions);
    if (!session) {
        return new Response("Unauthorized", { status: 401 });
    }
        try {
                await connectDB();
                const body = await request.json();
                // Parse officeLocation and departments as arrays
                const officeLocation = body.officeLocation
                    ? body.officeLocation.split(',').map(s => s.trim()).filter(Boolean)
                    : [];
                const departments = body.departments
                    ? body.departments.split(',').map(s => s.trim()).filter(Boolean)
                    : [];
                // Build the opportunity object as per schema
                const newOpportunity = new oppertunity({
                    ...body,
                    officeLocation,
                    contact: {
                        name: body.contactName,
                        email: body.contactEmail,
                        phone: body.contactPhone,
                        designation: body.contactDesignation,
                    },
                    compensation: {
                        ctc: body.ctc,
                        details: body.compensationDetails,
                    },
                    eligibility: {
                        cgpa: body.cgpa,
                        activeBacklogsAllowed: body.activeBacklogsAllowed,
                        departments,
                    },
                });
                await newOpportunity.save();
                return new Response(JSON.stringify(newOpportunity), { status: 201 });
        } catch (error) {
                console.error("Error creating opportunity:", error);
                return new Response("Failed to create opportunity", { status: 500 });
        }
}

export async function PUT(request) {
    const session = await getServerSession(authOptions);
    if (!session) {
        return new Response("Unauthorized", { status: 401 });
    }
    
    try {
        await connectDB();
        const body = await request.json();
        const { id, ...updateData } = body;
        
        if (!id) {
            return new Response("Opportunity ID is required", { status: 400 });
        }
        
        // Parse officeLocation and departments as arrays
        const officeLocation = updateData.officeLocation
            ? updateData.officeLocation.split(',').map(s => s.trim()).filter(Boolean)
            : [];
        const departments = updateData.departments
            ? updateData.departments.split(',').map(s => s.trim()).filter(Boolean)
            : [];
        
        // Build the update object as per schema
        const updateObject = {
            ...updateData,
            officeLocation,
            contact: {
                name: updateData.contactName,
                email: updateData.contactEmail,
                phone: updateData.contactPhone,
                designation: updateData.contactDesignation,
            },
            compensation: {
                ctc: updateData.ctc,
                details: updateData.compensationDetails,
            },
            eligibility: {
                cgpa: updateData.cgpa,
                activeBacklogsAllowed: updateData.activeBacklogsAllowed,
                departments,
            },
        };
        
        const updatedOpportunity = await oppertunity.findByIdAndUpdate(
            id, 
            updateObject, 
            { new: true }
        );
        
        if (!updatedOpportunity) {
            return new Response("Opportunity not found", { status: 404 });
        }
        
        return new Response(JSON.stringify(updatedOpportunity), { status: 200 });
    } catch (error) {
        console.error("Error updating opportunity:", error);
        return new Response("Failed to update opportunity", { status: 500 });
    }
}
