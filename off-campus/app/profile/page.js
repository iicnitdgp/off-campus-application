"use client"
import React from 'react'
import { useSession, signOut } from 'next-auth/react'
import Image from 'next/image'
import styles from './profile.module.css'
import { redirect } from "next/navigation"
import OpportunityCreate from '@/component/oppertunityCreate'
import OpportunityUpdate from '@/component/oppertunityUpdate'

const ProfilePage = () => {
    const { data: session } = useSession()

    if (!session) {
        redirect('/login')
    }

    return (
        <div className="container">
            <div className={styles.profileContainer}>
                <div className={styles.welcomeCard}>
                    <div className={styles.userAvatar}>
                        {session?.user?.image ? (
                            <Image 
                                src={session.user.image} 
                                alt={session.user.name || 'User avatar'} 
                                width={80}
                                height={80}
                                className={styles.avatarImage}
                            />
                        ) : (
                            <div className={styles.avatarPlaceholder}>
                                {session?.user?.name?.charAt(0) || 'A'}
                            </div>
                        )}
                    </div>
                    <div className={styles.userInfo}>
                        <h1 className={styles.welcomeTitle}>Welcome back, {session?.user?.name}!</h1>
                        <p className={styles.userEmail}>{session?.user?.email}</p>
                        <div className={styles.userRole}>Administrator</div>
                    </div>
                </div>

                <div className={styles.actionsSection}>
                    <h2>Manage Opportunities</h2>
                    <p>Create and manage off-campus placement opportunities for students</p>
                    <div className={styles.actionButtons}>
                        <OpportunityCreate />
                        <OpportunityUpdate />
                    </div>
                </div>

                <div className={styles.adminActions}>
                    <button className={styles.signOutBtn} onClick={() => signOut()}>
                        Sign Out
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ProfilePage
