import { useState } from 'react';
import Button from 'components/Button';
import Tooltip from 'components/Tooltip';
import InputField from 'components/InputField';
import TextField from 'components/TextField';
import { FaSearch as SearchIcon } from 'react-icons/fa';
import InfoTooltip from 'components/InfoTooltip';
import Checkbox from 'components/Checkbox';
import RadioButton from 'components/RadioButton';
import Tabs from 'components/Tabs';
import List from 'components/List';
import ListOption from 'components/List/ListOption';

const TestPage = () => {
  const [topTooltip, showTopTooltip] = useState(false);
  const [bottomTooltip, showBottomTooltip] = useState(false);
  const [checked, setChecked] = useState(false);
  const [value, setValue] = useState('');
  const [radioValue, setRadioValue] = useState('yes');
  const [listOptions] = useState(['1 items', '2 items', '3 items', '4 items']);
  const [selectedListOption, setSelectedListOption] = useState('1 items');

  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: '5rem',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '2rem 1rem'
      }}
    >
      <div style={{ width: '700px' }}>
        <p style={{ marginBottom: 10 }}>A button:</p>

        <div style={{ display: 'flex', gap: 20, marginBottom: 40 }}>
          <Button>My Button</Button>
          <Button variant="flat">A flat button</Button>
          <Button variant="stroked">A stroked button</Button>
          <Button variant="flat" color="secondary">
            In a different color
          </Button>
        </div>
        <div style={{ display: 'flex', gap: 20, marginBottom: 40 }}>
          <Button size="large">My Button</Button>
          <Button size="large" variant="flat">
            A flat button
          </Button>
          <Button size="large" variant="stroked">
            A stroked button
          </Button>
          <Button size="large" variant="flat" color="secondary">
            In a different color
          </Button>
        </div>
        <div style={{ display: 'flex', gap: 20, marginBottom: 40 }}>
          <Button size="xlarge">My Button</Button>
          <Button size="xlarge" variant="flat">
            A flat button
          </Button>
          <Button size="xlarge" variant="stroked">
            A stroked button
          </Button>
          <Button size="xlarge" variant="flat" color="secondary">
            In a different color
          </Button>
        </div>
      </div>
      <div>
        <p style={{ marginBottom: 10 }}>A tooltip:</p>
        <div style={{ display: 'flex', gap: 20, marginBottom: 40 }}>
          <div style={{ position: 'relative' }}>
            <button onMouseEnter={() => showTopTooltip(true)} onMouseLeave={() => showTopTooltip(false)} type="button">
              Hover me for top tooltip
            </button>
            <Tooltip show={topTooltip} position="top">
              I am a top tooltip
            </Tooltip>
          </div>
          <div style={{ position: 'relative' }}>
            <button
              onMouseEnter={() => showBottomTooltip(true)}
              onMouseLeave={() => showBottomTooltip(false)}
              type="button"
            >
              Hover me for bottom tooltip
            </button>
            <Tooltip show={bottomTooltip} position="bottom">
              I am a bottom tooltip
            </Tooltip>
          </div>
          <div>
            <InfoTooltip>Something</InfoTooltip>
          </div>
        </div>
      </div>
      <div>
        <p style={{ marginBottom: 10 }}>A text input:</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20, marginBottom: 40, width: '700px' }}>
          <InputField value={value} onChange={setValue} />
          <InputField leadingIcon={<SearchIcon />} value={value} onChange={setValue} />
          <TextField value={value} onChange={setValue} />
        </div>
      </div>
      <div>
        <p style={{ marginBottom: 10 }}>A checkbox:</p>
        <div style={{ display: 'flex', gap: 20, marginBottom: 40 }}>
          <Checkbox checked={checked} onChange={setChecked}>
            Hello
          </Checkbox>
          <Checkbox indeterminate>Indeterminate</Checkbox>
        </div>
      </div>
      <div>
        <p style={{ marginBottom: 10 }}>A radio button:</p>
        <div style={{ display: 'flex', gap: 20, marginBottom: 40 }}>
          <RadioButton onChange={() => setRadioValue('yes')} checked={radioValue === 'yes'}>
            Yes
          </RadioButton>
          <RadioButton onChange={() => setRadioValue('no')} checked={radioValue === 'no'}>
            No
          </RadioButton>
        </div>
      </div>
      <div style={{ display: 'flex', gap: 20, marginBottom: 40 }}>
        <Tabs
          options={[
            { id: 'first', children: 'First' },
            { id: 'second', children: 'Second' }
          ]}
        />
      </div>
      <div>
        <div style={{ marginBottom: 40 }}>
          <List value={selectedListOption}>
            {listOptions.map((option, index) => (
              <ListOption
                onSelect={() => setSelectedListOption(option)}
                selected={option === selectedListOption}
                text={option}
                key={index}
              />
            ))}
          </List>
        </div>
      </div>
    </div>
  );
};

export default TestPage;
