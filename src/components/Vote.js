import React, { useEffect, Fragment, useState } from 'react'
import moment from 'moment'
import { getCurrentEpoch, getCurrentVotingChoices, castVote, unloadCache } from '../lib/voting'

const statuses = {
  INITIAL: -1,
  LOADING: 0,
  ERROR: 1,
  READY: 2,
  VOTING: 3,
  VOTED: 4,
  CLOSED: 5,
  SKIPPED_VOTING: 6
}

const Vote = () => {
  const [ status, setStatus ] = useState(statuses.INITIAL)
  const [ choices, setChoices ] = useState(null)
  const [ currentEpoch, setCurrentEpoch ] = useState(null)
  const [ choice, setChoice ] = useState(null)
  const [ formError, setFormError ] = useState(null)
  const [ showResults, setShowResults ] = useState(false)

  const setup = async () => {
    try {
      unloadCache()
      setStatus(statuses.LOADING)
      const [ choices, currentEpoch ] = await Promise.all([
        getCurrentVotingChoices(),
        getCurrentEpoch()
      ])

      setChoices(choices)
      setCurrentEpoch(currentEpoch)
      if (choices.alreadyVoted) {
        setStatus(statuses.VOTED)
      } else if (!choices.open) {
        setStatus(statuses.CLOSED)
      } else {
        setStatus(statuses.READY)
      }
    } catch (error) {
      console.error('Error setting up voting', error)
      setStatus(statuses.ERROR)
    }
  }

  const vote = async () => {
    try {
      setStatus(statuses.VOTING)
      await castVote(currentEpoch.id + 1, choice)
      const newResults = { ...choices.results }
      newResults[choice]++
      setChoices({
        ...choices,
        results: newResults
      })
      setStatus(statuses.VOTED)
    } catch (error) {
      console.error('Error whilst voting', error)
      setFormError('Unable to cast vote')
      setShowResults(true)
      setStatus(statuses.READY)
    }
  }

  const onSubmit = (e) => {
    e.preventDefault()
    setFormError(null)
    if (!choice || !choices.choices.map(({ id }) => id).includes(choice)) {
      return setFormError('Please select from the following choices')
    }

    vote()
  }

  useEffect(() => {
    if (status === statuses.INITIAL) setup()
  }, [ status ])

  const renderLoading = () => (
    <div className='loading'>
      <div className='sk-folding-cube'>
        <div className="sk-cube1 sk-cube" />
        <div className="sk-cube2 sk-cube" />
        <div className="sk-cube4 sk-cube" />
        <div className="sk-cube3 sk-cube" />
      </div>
    </div>
  )

  const getResultPercentage = (choice) => {
    const total = Object.values(choices.results).reduce((a, b) => a + b)
    const percentage = ((choices.results[choice] / total) * 100).toFixed(1)
    if (isNaN(percentage)) return '0.0'
    if (isFinite(percentage)) return percentage.toString()
    return '100.0'
  }

  return (
    <div id='voting-container'>
      {(status === statuses.INITIAL || status === statuses.LOADING) && renderLoading()}
      {status === statuses.ERROR &&
        <div className='error-container'>
          <p><strong>Error loading voting form</strong></p>
        </div>
      }
      {(status === statuses.READY || status === statuses.VOTING) &&
        <Fragment>
          <div>
            <h2 className='main-title'>Epoch {currentEpoch.id + 1}</h2>
            <h3>{moment(currentEpoch.endTime).format('Do MMM YYYY, HH:mm:ss')}</h3>
            <p>Voting closes 1 hour prior to the next Epoch commencing.</p>
          </div>
          <form className={[ status === statuses.VOTING && 'form-loading' ]} onSubmit={onSubmit}>
            {formError &&
              <div className='form-error'>
                <p>{formError}</p>
              </div>
            }
            {choices.choices.map(({ id, name, url }) => (
              <div key={id}>
                <input checked={id === choice} disabled={status === statuses.VOTING} onChange={(e) => setChoice(e.target.value)} type='radio' id={id} name='choice' value={id} />
                <label htmlFor={id}>{name}</label><a href={url} target='_blank' rel="noopener noreferrer"><span className='fa fa-link' /></a>
              </div>
            ))}
            <div className='submit'>
              <button className='primary' type='submit' disabled={status === statuses.VOTING} onClick={onSubmit}>Cast vote</button>
              {showResults &&
                <button
                  onClick={(e) => {
                    e.preventDefault()
                    setStatus(statuses.SKIPPED_VOTING)
                  }}
                >Show results</button>
              }
            </div>
          </form>
          {status === statuses.VOTING && renderLoading()}
        </Fragment>
      }
      {(status === statuses.CLOSED || status === statuses.SKIPPED_VOTING || status === statuses.VOTED) &&
        <div className='results'>
          <div>
            <h2 className='main-title'>Epoch {currentEpoch.id + 1}</h2>
            <h3>{moment(currentEpoch.endTime).format('Do MMM YYYY, HH:mm:ss')}</h3>
          </div>
          <p>
            {status === statuses.CLOSED && 'Voting for the next epoch has now closed'}
            {status === statuses.SKIPPED_VOTING &&
              <a
                href='#'
                onClick={(e) => {
                  e.preventDefault()
                  setStatus(statuses.READY)
                }}
              >Click to go back and cast your vote</a>
            }
            {status === statuses.VOTED && 'Thanks for your vote'}
          </p>
          <ol>
            {choices.choices.map(choice => (
              <li key={choice.id}><a href={choice.url} target='_blank' rel="noopener noreferrer">{choice.name}</a> - {choices.results[choice.id]} ({getResultPercentage(choice.id)}%)</li>
            ))}
          </ol>
          <p>
            Rewards from the next Epoch will be distributed to each of the charities above proportional to the amount of votes they have received.
          </p>
        </div>
      }
    </div>
  )
}

export default Vote
