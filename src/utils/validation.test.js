import { test } from 'node:test'
import assert from 'node:assert/strict'
import { propertySchema } from './validation.js'

test('property type enum keeps its custom error message', () => {
  const result = propertySchema.safeParse({
    title: 'A lovely flat',
    type: 'not-a-real-type',
    location: '123 Main St, Springfield',
    rent: 1200,
    status: 'available',
    description: 'Spacious one bedroom apartment near downtown with parking.',
    bedrooms: 1,
    bathrooms: 1,
    image: 'https://example.com/flat.jpg',
  })

  assert.equal(result.success, false)
  const typeIssue = result.error.issues.find((issue) => issue.path[0] === 'type')
  assert.ok(typeIssue, 'expected a validation issue for the type field')
  assert.equal(typeIssue.message, 'Please select a property type from the dropdown')
})

test('property status enum keeps its custom error message', () => {
  const result = propertySchema.safeParse({
    title: 'A lovely flat',
    type: 'apartment',
    location: '123 Main St, Springfield',
    rent: 1200,
    status: 'not-a-real-status',
    description: 'Spacious one bedroom apartment near downtown with parking.',
    bedrooms: 1,
    bathrooms: 1,
    image: 'https://example.com/flat.jpg',
  })

  assert.equal(result.success, false)
  const statusIssue = result.error.issues.find((issue) => issue.path[0] === 'status')
  assert.ok(statusIssue, 'expected a validation issue for the status field')
  assert.equal(statusIssue.message, 'Please select the property availability status')
})
