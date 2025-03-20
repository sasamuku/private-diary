import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function DELETE() {
  try {
    const cookieStore = cookies()
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore })

    const {
      data: { session },
    } = await supabase.auth.getSession()

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const userId = session.user.id

    const supabaseAdmin = createRouteHandlerClient(
      {
        cookies: () => cookieStore,
      },
      {
        supabaseKey: process.env.SUPABASE_SERVICE_ROLE_KEY,
      },
    )

    const { error: postsError } = await supabaseAdmin
      .from('posts')
      .delete()
      .eq('user_id', userId)

    if (postsError) {
      console.error('Error deleting posts:', postsError)
      return NextResponse.json(
        { error: 'Failed to delete user posts' },
        { status: 500 },
      )
    }

    const { error: userDataError } = await supabaseAdmin
      .from('users')
      .delete()
      .eq('id', userId)

    if (userDataError) {
      console.error('Error deleting user data:', userDataError)
      return NextResponse.json(
        { error: 'Failed to delete user data' },
        { status: 500 },
      )
    }

    const { error: authUserError } =
      await supabaseAdmin.auth.admin.deleteUser(userId)

    if (authUserError) {
      console.error('Error deleting auth user:', authUserError)
      return NextResponse.json(
        { error: 'Failed to delete auth user' },
        { status: 500 },
      )
    }

    await supabase.auth.signOut()

    return NextResponse.json({
      success: true,
      message: 'Account and all related data successfully deleted',
    })
  } catch (error) {
    console.error('Account deletion error:', error)
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 },
    )
  }
}
