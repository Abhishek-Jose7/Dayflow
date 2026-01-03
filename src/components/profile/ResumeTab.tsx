'use client';

import React from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

interface ResumeTabProps {
    about: string;
    skills: string[];
    isEditable?: boolean;
}

export function ResumeTab({ about, skills, isEditable = false }: ResumeTabProps) {
    const [editMode, setEditMode] = React.useState(false);
    const [aboutText, setAboutText] = React.useState(about);
    const [skillsText, setSkillsText] = React.useState(skills.join(', '));

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const stored = localStorage.getItem('currentUser');
            const email = stored ? JSON.parse(stored).email : '';
            const res = await fetch('/api/employee/profile', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, about: aboutText, skills: skillsText.split(',').map(s => s.trim()) })
            });
            const data = await res.json();
            if (data.success) {
                alert('Resume updated');
                setEditMode(false);
            } else {
                alert('Failed to update resume');
            }
        } catch (err) {
            alert('Error updating resume');
        }
    };

    return (
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 350px', gap: '2rem' }}>
            {/* Left Column: About & Interests */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                {editMode ? (
                    <form onSubmit={handleSave}>
                        <div style={{ marginBottom: '1rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem' }}>About</label>
                            <textarea
                                value={aboutText}
                                onChange={e => setAboutText(e.target.value)}
                                rows={5}
                                style={{ width: '100%', padding: '0.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)' }}
                            />
                        </div>
                        <div style={{ marginBottom: '1rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem' }}>Skills (comma separated)</label>
                            <input
                                value={skillsText}
                                onChange={e => setSkillsText(e.target.value)}
                                style={{ width: '100%', padding: '0.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)' }}
                            />
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
                            <Button type="button" variant="ghost" onClick={() => setEditMode(false)}>Cancel</Button>
                            <Button type="submit">Save</Button>
                        </div>
                    </form>
                ) : (
                    <>
                        <Card title="About 🖊️">
                            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>{about}</p>
                        </Card>
                        {isEditable && (
                            <Button variant="outline" onClick={() => setEditMode(true)} style={{ alignSelf: 'flex-start' }}>Edit Resume</Button>
                        )}
                    </>
                )}
                {/* Static cards turned into empty placeholders */}
                <Card title="What I love about my job 🖊️">
                    <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, fontStyle: 'italic' }}>
                        Not filled in yet.
                    </p>
                </Card>
                <Card title="My interests and hobbies 🖊️">
                    <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, fontStyle: 'italic' }}>
                        Not filled in yet.
                    </p>
                </Card>
            </div>

            {/* Right Column: Skills & Certifications */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                <Card title="Skills">
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1rem' }}>
                        {skills.length > 0 ? skills.map(skill => (
                            <span key={skill} style={{ background: 'var(--bg-app)', padding: '0.25rem 0.75rem', borderRadius: 'var(--radius-full)', fontSize: '0.875rem', fontWeight: 500 }}>{skill}</span>
                        )) : <span style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>No skills added.</span>}
                    </div>
                    {isEditable && <button style={{ fontSize: '0.875rem', color: 'var(--primary)', background: 'none', border: 'none', cursor: 'pointer' }}>+ Add Skills</button>}
                </Card>
                <Card title="Certification">
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <div style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', fontStyle: 'italic' }}>No certifications added.</div>
                    </div>
                    {isEditable && <button style={{ marginTop: '1rem', fontSize: '0.875rem', color: 'var(--primary)', background: 'none', border: 'none', cursor: 'pointer' }}>+ Add Certification</button>}
                </Card>
            </div>
        </div>
    );
}
