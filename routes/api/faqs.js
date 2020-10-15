const express = require('express');


let Faq = require('../../models/Faq');

const router = express.Router();

//route Get api/tasks
//desc Get all faqs
//access public
router.get('/', async (req, res) => {
  try {
    const FaqData = await Faq.find();
    res.send(FaqData);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

//route Get api/tasks/:id
//desc Get task by id
//access public
router.get('/:id', async (req, res) => {
  try {
    const faqbyid = await Faq.findById(req.params.id);
    if (!faqbyid) {
      return res.status(404).send('Faq not found');
    }
    res.send(faqbyid);
  } catch (err) {
    res.status(500).send('Server error');
  }
});


//route delete api/tasks/:id
//desc delete task by id
//access public
router.delete('/:id', async (req, res) => {
  try {
    // find the element
    await Faq.findByIdAndRemove({ _id: req.params.id });

    res.json({ msg: 'Faq deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.put(
  "/update/:id",
  async (req, res) => {
    try {
        const faqupdate = await Faq.findById(req.params.id);
        Faq.updateOne(
          { _id: req.params.id },
          {
            $set: {
              question: req.body.question,
              answer: req.body.answer
            }
          },
          (err, data) => {
            if (err) console.log(err);
            console.log(data);
          }
        );
        if (!faqupdate) {
          res.status(404).send("Faq not found");
          res.end();
        }
        // res.send(studlist);
      }
     catch (err) {
      console.error(err);
    }
  }
);

router.post(
  "/addfaq",

  (req, res) => {
    try {

      Faq.create(
        {
          question: req.body.question,
          answer: req.body.answer
        },
        (err, data) => {
          if (err) console.log(err);
          console.log(data);
        }
      );
    } catch (err) {
      console.error(err);
    }
  }
);

module.exports = router;