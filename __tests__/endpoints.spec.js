const request = require('supertest');
const api = require('../server.js');

const sampleSuccessfulPostOne = {
  name: `note-${Date.now()}`,
  description: `Lorem ipsum dolor sit amet.`,
  parent_id: null,
};
const sampleSuccessfulPostTwo = {
  name: `note-${Date.now()}`,
};
const sampleFailedPost = {
  description: `Lorem ipsum dolor sit amet.`,
  parent_id: null,
};

describe('GET /notes', function() {
  it(`returns a status of 200`, async function(done) {
    const response = await request(api).get('/notes');
    expect(response.status).toEqual(200);
    done();
  });
  it(`returns an json object containing a bool, a message, and the notes`, async function(done) {
    const expectedOutput = {
      success: true,
      message: `Notes retrieved.`,
      notes: expect.any(Array),
    };
    const response = await request(api).get('/notes');
    expect(response.body).toEqual(expectedOutput);
    done();
  });
});

describe('POST /notes', function() {
  it('returns a 201 and the newly created note if successful', async function(done) {
    const expectedOutput = {
      success: true,
      message: `Note successfully created.`,
      note: {
        ...sampleSuccessfulPostOne,
        note_id: expect.any(Number),
      },
    };
    const response = await request(api)
      .post('/notes')
      .send(sampleSuccessfulPostOne);
    expect(response.status).toBe(201);
    expect(response.body).toEqual(expectedOutput);
    done();
  });
  it('fails if missing name', async function(done) {
    const expectedOutput = {
      success: false,
      message: `'name' is a required field for all new notes.`,
    };
    const response = await request(api)
      .post('/notes')
      .send(sampleFailedPost);
    expect(response.status).toBe(400);
    expect(response.body).toEqual(expectedOutput);
    done();
  });
  it('successful submission without description', async function(done) {
    const expectedOutput = {
      success: true,
      message: `Note successfully created.`,
      note: {
        ...sampleSuccessfulPostTwo,
        note_id: expect.any(Number),
        description: null,
        parent_id: null,
      },
    };
    const response = await request(api)
      .post('/notes')
      .send(sampleSuccessfulPostTwo);
    expect(response.status).toBe(201);
    expect(response.body).toEqual(expectedOutput);
    done();
  });
});

describe('GET /notes/:id', function() {
  it(`returns a status of 200`, async function(done) {
    const response = await request(api).get('/notes/1');
    expect(response.status).toEqual(200);
    done();
  });
  it(`returns an json object containing a bool, a message, and the single note`, async function(done) {
    const expectedOutput = {
      success: true,
      message: `Note retrieved.`,
      note: expect.any(Object),
    };
    const response = await request(api).get('/notes/1');
    expect(response.body).toEqual(expectedOutput);
    done();
  });
});

describe('DELETE /notes/:id', function() {
  it(`returns a status of 200`, async function(done) {
    const response = await request(api).del('/notes/1');
    expect(response.status).toEqual(200);
    done();
  });
  it(`returns an json object containing a bool, a message, and the deleted note`, async function(done) {
    const expectedOutput = {
      success: true,
      message: `Note deleted.`,
      deletedNote: expect.any(Object),
    };
    const response = await request(api).del('/notes/2');
    expect(response.body).toEqual(expectedOutput);
    done();
  });
});
