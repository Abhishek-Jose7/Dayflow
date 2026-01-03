'use client';

import React from 'react';
import { Card } from '@/components/ui/Card';

interface ResumeTabProps {
    about: string;
    skills: string[];
}

export function ResumeTab({ about, skills }: ResumeTabProps) {
    return (
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 350px', gap: '2rem' }}>
            {/* Left Column: About & Interests */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                <Card title="About 🖊️">
                    <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                        {about}
                    </p>
                </Card>

                <Card title="What I love about my job 🖊️">
                    <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                        I love the challenge of solving complex problems and the satisfaction of seeing my code
                        used by real people. The collaborative environment at Dayflow allows me to learn from
                        talented colleagues and constantly improve my skills.
                    </p>
                </Card>

                <Card title="My interests and hobbies 🖊️">
                    <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                        In my free time, I enjoy hiking, reading sci-fi novels, and experimenting with new
                        technologies. I'm also an avid photographer and love capturing landscapes during my travels.
                    </p>
                </Card>
            </div>

            {/* Right Column: Skills & Certifications */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                <Card title="Skills">
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1rem' }}>
                        {skills.map(skill => (
                            <span key={skill} style={{
                                background: 'var(--bg-app)', padding: '0.25rem 0.75rem',
                                borderRadius: 'var(--radius-full)', fontSize: '0.875rem', fontWeight: 500
                            }}>
                                {skill}
                            </span>
                        ))}
                    </div>
                    <button style={{ fontSize: '0.875rem', color: 'var(--primary)', background: 'none', border: 'none', cursor: 'pointer' }}>+ Add Skills</button>
                </Card>

                <Card title="Certification">
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <div style={{ padding: '0.5rem', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-md)' }}>
                            <div style={{ fontWeight: 600 }}>AWS Certified Solutions Architect</div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>2024</div>
                        </div>
                    </div>
                    <button style={{ marginTop: '1rem', fontSize: '0.875rem', color: 'var(--primary)', background: 'none', border: 'none', cursor: 'pointer' }}>+ Add Certification</button>
                </Card>
            </div>
        </div>
    );
}
